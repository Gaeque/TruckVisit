import { TouchableOpacity, View, Text, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { IconReturn } from "../../components/IconReturn";
import IconAgendamento2 from "../../assets/IconAgendamento2.svg";

import { styles } from "./styles";

import { HomeRoutesProps } from "../../routes/home.routes";
import { CardAppointments } from "../../components/CardAppointments";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { AppointmentsDTO } from "../../dtos/AppointmentsDTO";
import { Loading } from "../../components/Loading";
import TeconLogo from "../../assets/TeconLogo.svg";
import { AxiosError } from "axios";
import { Button } from "../../components/Button";
import THEME from "../../THEME";
import Pdf from "react-native-pdf";

import * as FileSystem from "expo-file-system";
import Share from "react-native-share";

export function Appointments() {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<HomeRoutesProps>();
  const [appointments, setAppointments] = useState<AppointmentsDTO[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    AppointmentsDTO[]
  >([]);
  const [isSharing, setIsSharing] = useState(false);
  const [doorPassBase64, setdoorPassBase64] = useState<string | null>(null);
  const { gKey: userGkey } = useContext(AuthContext);
  const [ufvGkey, setUfvGkey] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  async function getAppointment() {
    try {
      setIsLoading(true);
      if (userGkey) {
        const response = await api.get(
          `/api-app-truckvisit/appointments?driverGkey=${userGkey}`
        );
        const data: AppointmentsDTO[] = response.data;
        const ufvGkeyFromResponse = data[0]?.ufvGkey;
        setUfvGkey(ufvGkeyFromResponse);
        setAppointments(data);
        setFilteredAppointments(data.slice(0, 6));
      }
    } catch (error) {
      if (error) {
        Alert.alert(
          "Aviso",
          "Não conseguimos retornar seus agendamentos, tente novamente."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function getDoorPass(userGkey: number, ufvGkey: number) {
    try {
      setIsLoading(true);
      console.log("USERGKEY:", userGkey, "UFVGKEY:", ufvGkey);
      const response = await api.get(
        `/api-app-truckvisit/appointments/door-pass?driverGkey=${userGkey}&ufvGkey=${ufvGkey}`,
        {
          responseType: "arraybuffer",
        }
      );
      if (response.status !== 200) {
        Alert.alert(
          "Erro",
          "Não foi possível buscar seu Passe de Porta, tente novamente."
        );
        return;
      }
      const base64 = btoa(
        String.fromCharCode(...new Uint8Array(response.data))
      );
      setdoorPassBase64(base64);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        Alert.alert("Aviso", message);
      } else {
        console.error("Erro inesperado:", error);
        Alert.alert(
          "Erro",
          "Não foi possível buscar seu ticket. Tente novamente."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSharePDF() {
    if (doorPassBase64) {
      setIsSharing(true);
      const uri = `${FileSystem.cacheDirectory}ticket.pdf`;
      await FileSystem.writeAsStringAsync(uri, doorPassBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const shareOptions = {
        title: "Compartilhar PDF",
        url: `file://${uri}`,
        failOnCancel: false,
      };

      try {
        await Share.open(shareOptions);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível compartilhar o arquivo");
      } finally {
        setIsSharing(false);
      }
    }
  }

  const handleClosePDF = () => setdoorPassBase64(null);

  useEffect(() => {
    getAppointment();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("TabRoutes")}>
          <IconReturn width={40} height={40} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Agendamento</Text>
        <IconAgendamento2 width={40} height={40} />
      </View>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <Loading />
        ) : appointments.length === 0 ? (
          <View style={styles.noAppointmentContainer}>
            <Text style={styles.noAppointmentText}>
              Nenhum Agendamento encontrado
            </Text>
            <TeconLogo width={200} height={100} />
          </View>
        ) : (
          <FlatList
            data={filteredAppointments}
            renderItem={({ item }) => (
              <CardAppointments
                unitId={item.unitId}
                position={item.position}
                category={item.category}
                equipType={item.equipType}
                requestedTime={item.requestedTime}
                onVisualizePDF={() => {
                  if (ufvGkey && userGkey) {
                    getDoorPass(Number(userGkey), Number(item.ufvGkey));
                  } else {
                    Alert.alert(
                      "Erro",
                      "Dados insuficientes para visualizar o PDF."
                    );
                  }
                }}
              />
            )}
          />
        )}
      </View>

      {doorPassBase64 && (
        <>
          <Pdf
            source={{ uri: `data:application/pdf;base64,${doorPassBase64}` }}
            style={styles.pdfContainer}
            enablePaging={true}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            onLoadComplete={(numberOfPages) => {
              setTotalPages(numberOfPages);
            }}
            onPageChanged={(page) => {
              setCurrentPage(page);
            }}
          />

          <View style={styles.sharePdfContainer}>
            <Button
              onPress={handleSharePDF}
              title={
                isSharing ? (
                  <Loading color={THEME.COLORS.WHITE} />
                ) : (
                  "Salvar ou Compartilhar PDF"
                )
              }
              showIcon={false}
              textColor={THEME.COLORS.WHITE}
              fontSize={16}
              backgroundColor={THEME.COLORS.ORANGE}
              borderColor={THEME.COLORS.ORANGE}
              size={{ width: 280, height: 40 }}
              disabled={isSharing}
            />
          </View>

          <View style={styles.closePdf}>
            <TouchableOpacity onPress={handleClosePDF}>
              <IconReturn width={40} height={40} color={THEME.COLORS.BLACK} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
