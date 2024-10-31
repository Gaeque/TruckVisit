import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, View, Text, FlatList, Alert } from "react-native";

import { Loading } from "../../components/Loading";
import IconFilter from "../../assets/IconFilter.svg";

import { styles } from "./styles";

import { CardTransactions } from "../../components/CardTransactions";

import { useNavigation } from "@react-navigation/native";
import { HomeRoutesProps } from "../../routes/home.routes";

import * as FileSystem from "expo-file-system";
import Share from "react-native-share";

import DateFilter from "../../utils/dateFilter";

import Pdf from "react-native-pdf";

import { TransactionsDTO } from "../../dtos/TransactionsDTO";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { AxiosError } from "axios";
import THEME from "../../THEME";
import { IconReturn } from "../../components/IconReturn";

export function LastTransactions() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionsDTO[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionsDTO[]
  >([]);
  const [ticketBase64, setTicketBase64] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigation = useNavigation<HomeRoutesProps>();
  const { gKey: userGkey } = useContext(AuthContext);

  async function fetchTransactionsCard() {
    try {
      setIsLoading(true);
      if (userGkey) {
        const response = await api.get(
          `/api-app-truckvisit/truckVisit/${userGkey}`
        );
        const data: TransactionsDTO[] = response.data;
        setTransactions(data);
        setFilteredTransactions(data.slice(0, 6));
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
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
          <IconFilter width={40} height={40} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Loading />
      ) : transactions.length === 0 ? (
        <View style={styles.noTransactionsContainer}>
          <Text style={styles.noTransactionsText}>
            Transações não encontradas nesse CPF
          </Text>
        </View>
      ) : (
        <>
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
        </>
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
            <TouchableOpacity style={styles.sharePdf} onPress={handleSharePDF}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Salvar ou Compartilhar PDF
              </Text>
            </TouchableOpacity>
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
