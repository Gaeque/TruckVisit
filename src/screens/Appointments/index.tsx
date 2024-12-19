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

export function Appointments() {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<HomeRoutesProps>();
  const [appointments, setAppointments] = useState<AppointmentsDTO[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    AppointmentsDTO[]
  >([]);
  const { gKey: userGkey } = useContext(AuthContext);

  async function getAppointment() {
    try {
      setIsLoading(true);
      if (userGkey) {
        const response = await api.get(
          `/api-app-truckvisit/appointments?driverGkey=${userGkey}`
        );
        const data: AppointmentsDTO[] = response.data;
        console.log(data);
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
              />
            )}
          />
        )}
      </View>
    </View>
  );
}
