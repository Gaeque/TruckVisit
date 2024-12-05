import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

import { Card as PaperCard } from "react-native-paper";

import { styles } from "./styles";
import THEME from "../../THEME";

import IconTicket from "../../assets/IconTicket.svg";
import { Button } from "../Button";
import { Loading } from "../Loading";

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
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal() {
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  const handleSelection = (type: string) => {
    setIsLoading(true);
    setSelectedType(type);
    if (onSelectType) {
      onSelectType(type);
    }
    console.log(type)
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
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
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  Qual ticket deseja visualizar?
                </Text>
                <View style={styles.cardContainer}>
                  <Button
                    title={
                      isLoading ? (
                        <Loading color={THEME.COLORS.WHITE} />
                      ) : (
                        "Entrada"
                      )
                    }
                    showIcon={false}
                    backgroundColor={THEME.COLORS.ORANGE}
                    textColor={THEME.COLORS.WHITE}
                    size={{ width: 240, height: 60 }}
                    onPress={() => handleSelection("ingate")}
                  />
                  <Button
                    title={
                      isLoading ? (
                        <Loading color={THEME.COLORS.WHITE} />
                      ) : (
                        "Saída"
                      )
                    }
                    showIcon={false}
                    backgroundColor={THEME.COLORS.ORANGE}
                    textColor={THEME.COLORS.WHITE}
                    size={{ width: 240, height: 60 }}
                    onPress={() => handleSelection("outgate")}
                  />
                </View>
                <Button
                  title="Fechar"
                  fontWeight={"600"}
                  showIcon={false}
                  fontSize={16}
                  textColor={THEME.COLORS.ORANGE}
                  size={{ width: 100, height: 40 }}
                  onPress={handleCloseModal}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
