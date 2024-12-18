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
import IconTruckImpo from "../../assets/IconTruckImpo.svg";
import IconTruckExpo from "../../assets/IconTruckExpo.svg";
import { Button } from "../Button";
import THEME from "../../THEME";

type cardAppointmentsProps = {
  unitId?: string;
  category?: string;
  position?: string;
  expirationDoorPass?: string;
  requestedTime?: string;
  equipType?: string;
};

function formatDateTime(dateTime: string | undefined): string {
  if (!dateTime) return "--------";
  const date = new Date(dateTime);
  const time = date.toLocaleTimeString("pt-BR", {
    hour12: false,
    minute: "2-digit",
    hour: "2-digit",
  });
  const formattedDate = date.toLocaleDateString("pt-BR");
  return `${time} - ${formattedDate}`;
}

export function CardAppointments({
  unitId,
  category,
  position,
  requestedTime,
  equipType,
}: cardAppointmentsProps) {
  const IconComponent = category === "IMPRT" ? IconTruckImpo : IconTruckExpo;

  const [isModalVisible, setModalVisible] = useState(false);

  function handleOpenModal() {
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleOpenModal}
        style={styles.container}
      >
        <PaperCard style={styles.card}>
          <View style={styles.rowContainer}>
            <View style={styles.leftColumn}>
              <View>
                <Text style={styles.titulo}>Container</Text>
                <Text style={styles.paragrafo}>{unitId || "--------"}</Text>
              </View>
              <View>
                <Text style={styles.titulo}>Posição</Text>
                <Text style={styles.paragrafo}>{position || "--------"}</Text>
              </View>
            </View>

            <View style={styles.centerColumn}>
              <View>
                <Text style={styles.titulo}>Agendamento</Text>
                <Text style={styles.paragrafo}>
                  {formatDateTime(requestedTime)}
                </Text>
              </View>
              <View>
                <Text style={styles.titulo}>ISO/TIPO</Text>
                <Text style={styles.paragrafo}>{equipType || "--------"}</Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomColumn}>
            <IconComponent width={200} height={60} />
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
                <Text style={styles.modalTitle}>Passe de porta</Text>
                <View style={styles.cardContainer}></View>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Fechar"
                    fontWeight={"600"}
                    showIcon={false}
                    fontSize={16}
                    textColor={THEME.COLORS.ORANGE}
                    size={{ width: 150, height: 40 }}
                    onPress={handleCloseModal}
                  />
                  <Button
                    title="Visualizar PDF"
                    fontWeight={"600"}
                    showIcon={false}
                    fontSize={16}
                    textColor={THEME.COLORS.ORANGE}
                    size={{ width: 150, height: 40 }}
                    onPress={handleCloseModal}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
