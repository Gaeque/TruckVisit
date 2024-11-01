import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { styles } from "./styles";
import IconFilter from "../../assets/IconFilter.svg";
import { Button } from "../../components/Button";
import THEME from "../../THEME";

type DateSelectedProps = {
  onSelectDate?: (date: number) => void;
};

export default function DateFilterModal({ onSelectDate }: DateSelectedProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectDate, setSelectedDate] = useState<number>();

  const handleFilterSelection = (date: number) => {
    setSelectedDate(date);
    setModalVisible(false);
    onSelectDate && onSelectDate(date); 
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <IconFilter width={40} height={40} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Últimas transações</Text>
            <View style={styles.filterButtonsGrid}>
              <Button
                title="7 Dias"
                showIcon={false}
                backgroundColor={THEME.COLORS.ORANGE}
                textColor={THEME.COLORS.WHITE}
                fontWeight="500"
                fontSize={16}
                size={{ width: 100, height: 40 }}
                onPress={() => handleFilterSelection(7)}
              />
              <Button
                title="15 Dias"
                showIcon={false}
                backgroundColor={THEME.COLORS.ORANGE}
                textColor={THEME.COLORS.WHITE}
                fontWeight="500"
                fontSize={16}
                size={{ width: 100, height: 40 }}
                onPress={() => handleFilterSelection(15)}
              />
              <Button
                title="1 Mês"
                showIcon={false}
                backgroundColor={THEME.COLORS.ORANGE}
                textColor={THEME.COLORS.WHITE}
                fontWeight="500"
                fontSize={16}
                size={{ width: 100, height: 40 }}
                onPress={() => handleFilterSelection(30)}
              />
              <Button
                title="6 Meses"
                showIcon={false}
                backgroundColor={THEME.COLORS.ORANGE}
                textColor={THEME.COLORS.WHITE}
                fontWeight="500"
                fontSize={16}
                size={{ width: 100, height: 40 }}
                onPress={() => handleFilterSelection(183)}
              />
            </View>

            <Button
              title="Fechar"
              fontWeight={"600"}
              showIcon={false}
              fontSize={16}
              textColor={THEME.COLORS.ORANGE}
              size={{ width: 100, height: 40 }}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
