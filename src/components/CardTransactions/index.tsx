import React, { useContext, useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "./styles";
import { Card as PaperCard } from "react-native-paper";
import IconTicket from "../../assets/IconTicket.svg";
import THEME from "../../THEME";

type CardTransactionsProps = {
  placa?: string;
  containers?: { name: string; position: string }[];
  transacoes?: string;
  dataEntrada?: string;
  dataSaida?: string;
  onPress?: () => void;
  onSelectType?: (type: string) => void;
  borderColor?: string;
};

export function CardTransactions({
  placa,
  containers = [],
  transacoes,
  dataEntrada,
  dataSaida,
  onPress,
  onSelectType,
  borderColor,
}: CardTransactionsProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  function handleOpenModal() {
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  const handleSelection = (type: string) => {
    setSelectedType(type);
    if (onSelectType) {
      onSelectType(type);
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.container}
        onPress={handleOpenModal}
      >
        <PaperCard style={[styles.card, { borderColor: borderColor }]}>
          <View style={styles.rowContainer}>
            <View style={styles.containerPlacaTransacoes}>
              <Text style={styles.titulo}>PLACA</Text>
              <Text style={styles.paragrafo}>{placa || "XXXXXXX"}</Text>
              <Text style={styles.titulo}>TRANSAÇÕES</Text>
              <Text style={styles.paragrafo}>{transacoes || "XX"}</Text>
            </View>

            <View style={styles.containerData}>
              <Text style={styles.titulo}>DATA ENTRADA</Text>
              <Text style={styles.paragrafo}>
                {dataEntrada || "HH:MM - DD/MM/AA"}
              </Text>
              <Text style={styles.titulo}>DATA SAÍDA</Text>
              <Text style={styles.paragrafo}>
                {dataSaida || "Transação em andamento"}
              </Text>
            </View>

            <View style={styles.containerTicket}>
              <Text style={styles.titulo}>TICKET</Text>
              <IconTicket width={"100%"} height={50} />
            </View>
          </View>

          <View style={styles.containerList}>
            {containers.length > 0 ? (
              containers.map((container, index) => (
                <View key={index} style={styles.containerItem}>
                  <Text style={styles.containerTitle}>Container</Text>
                  <Text style={styles.containerName}>{container.name}</Text>
                  <Text style={styles.containerTitle}>Posição</Text>
                  <Text style={styles.containerName}>
                    {container.position || "Não informada"}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.paragrafo}>Container não informado</Text>
            )}
          </View>
        </PaperCard>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Qual ticket deseja visualizar?
              </Text>
              <View style={styles.cardContainer}>
                <TouchableOpacity
                  style={styles.ticketCard}
                  onPress={() => handleSelection("ingate")}
                >
                  <Text style={styles.ticketText}>Entrada</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.ticketCard}
                  onPress={() => handleSelection("outgate")}
                >
                  <Text style={styles.ticketText}>Saída</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.closeModalButton}
              >
                <Text style={styles.closeModalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
