import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./styles";

type DateFilterProps = {
  onFilter: (startDate: Date | null, endDate: Date | null) => void;
};

export default function DateFilter({ onFilter }: DateFilterProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (event: any, selectedDate?: Date | undefined) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date | undefined) => {
    setShowEndDatePicker(false);
    if (selectedDate && startDate && selectedDate < startDate) {
      Alert.alert(
        "Data inválida",
        "Data final não pode ser inferior à data inicial."
      );
      return;
    }
    setEndDate(selectedDate || endDate);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    onFilter(null, null);
  };

  const applyFilters = () => {
    if (startDate && endDate && endDate < startDate) {
      Alert.alert(
        "Data inválida",
        "Data final não pode ser inferior à data inicial."
      );
      return;
    }
    onFilter(startDate, endDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dates}>
        <TouchableOpacity
          onPress={() => setShowStartDatePicker(true)}
          style={styles.date}
        >
          <Text>{formatDate(startDate) || "Data inicial"}</Text>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowEndDatePicker(true)}
          style={styles.date}
        >
          <Text>{formatDate(endDate) || "Data final"}</Text>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
          <Text style={styles.buttonText}>Limpar filtro</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
          <Text style={styles.buttonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
