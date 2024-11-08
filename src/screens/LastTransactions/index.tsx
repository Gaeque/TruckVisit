import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, View, Text, FlatList, Alert } from "react-native";

import { styles } from "./styles";
import THEME from "../../THEME";

import { Loading } from "../../components/Loading";
import { CardTransactions } from "../../components/CardTransactions";
import DateFilter from "../../utils/dateFilter";
import { IconReturn } from "../../components/IconReturn";
import { Button } from "../../components/Button";
import TeconLogo from "../../assets/TeconLogo.svg";

import { useNavigation } from "@react-navigation/native";
import { HomeRoutesProps } from "../../routes/home.routes";

import * as FileSystem from "expo-file-system";
import Share from "react-native-share";
import Pdf from "react-native-pdf";

import { TransactionsDTO } from "../../dtos/TransactionsDTO";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

import { AxiosError } from "axios";

export function LastTransactions() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [transactions, setTransactions] = useState<TransactionsDTO[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionsDTO[]
  >([]);
  const [selectDate, setSelectDate] = useState(0);
  const [ticketBase64, setTicketBase64] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigation = useNavigation<HomeRoutesProps>();
  const { gKey: userGkey } = useContext(AuthContext);

  const getDateLabel = (date: number) => {
    switch (date) {
      case 7:
        return "dias";
      case 15:
        return "dias";
      case 30:
        return "mês";
      case 183:
        return "meses";
      default:
        return "";
    }
  };

  async function fetchTransactionsCard(date = selectDate) {
    try {
      setIsLoading(true);
      if (userGkey) {
        const response = await api.get(
          `/api-app-truckvisit/truckVisit/${userGkey}/${date}`
        );
        const data: TransactionsDTO[] = response.data;
        setTransactions(data);
        setFilteredTransactions(data.slice(0, 6));
      }
    } catch (error) {
      if (error) {
        Alert.alert(
          "Aviso",
          "Não conseguimos retornar suas transações, tente novamente."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchTicketTransaction(type: string, visitGkey: number) {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/api-app-truckvisit/truckVisit/ticket/${visitGkey}/${type}`,
        {
          responseType: "arraybuffer",
        }
      );

      if (response.status !== 200) {
        Alert.alert("Não foi possível buscar seu ticket, tente novamente");
        return;
      }
      const base64 = btoa(
        String.fromCharCode(...new Uint8Array(response.data))
      );
      setTicketBase64(base64);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message ||
          "Transação não foi concluída\n\nTicket ainda será gerado.";
        Alert.alert("Aviso", message);
      } else {
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
    if (ticketBase64) {
      setIsSharing(true);
      const uri = `${FileSystem.cacheDirectory}ticket.pdf`;
      await FileSystem.writeAsStringAsync(uri, ticketBase64, {
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

  function handleClosePDF() {
    setTicketBase64(null);
  }

  function handleGoBack() {
    navigation.navigate("TabRoutes");
  }

  useEffect(() => {
    if (userGkey) {
      fetchTransactionsCard();
    }
  }, [userGkey]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <IconReturn width={40} height={40} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Últimas transações</Text>
        <TouchableOpacity>
          <DateFilter
            onSelectDate={(date) => {
              fetchTransactionsCard(date);
              setSelectDate(date);
            }}
          />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Loading />
      ) : transactions.length === 0 ? (
        <View style={styles.noTransactionsContainer}>
          <Text style={styles.noTransactionsText}>
            {`Nenhuma transação encontrada nos últimos ${selectDate} ${getDateLabel(
              selectDate
            )}`}
          </Text>
          <TeconLogo width={200} height={100} />
        </View>
      ) : (
        <FlatList
          data={filteredTransactions}
          renderItem={({ item }) => (
            <CardTransactions
              placa={item.truckID}
              containers={item.containers.map((container) => ({
                name: container.ID,
                position: container.position,
              }))}
              transacoes={item.containers.length.toString()}
              dataEntrada={item.entered}
              dataSaida={item.exited}
              borderColor={
                item.exited ? THEME.COLORS.GREY2 : THEME.COLORS.GREEN
              }
              onSelectType={(type) => fetchTicketTransaction(type, item.gkey)}
            />
          )}
          keyExtractor={(item) => item.gkey.toString()}
          contentContainerStyle={styles.cardsTransactions}
        />
      )}

      {ticketBase64 && (
        <>
          <Pdf
            source={{ uri: `data:application/pdf;base64,${ticketBase64}` }}
            style={styles.pdfContainer}
            enablePaging={true}
            horizontal={true}
            onPageChanged={(page) => {
              setCurrentPage(page);
            }}
            onLoadComplete={(numberOfPages) => {
              setTotalPages(numberOfPages);
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

          <View style={styles.numberOfPages}>
            <Text style={{ fontSize: 20 }}>
              {currentPage}/{totalPages}
            </Text>
          </View>

          <View style={styles.closePdf}>
            <TouchableOpacity onPress={handleClosePDF}>
              <IconReturn width={50} height={50} color="#000" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
