import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

type Props = {
  id: string,
  invoice: string,
  invoicevalue: string,
  taxcode: string,
  state: string,
  supplier: string,
  taxamount: Float
}

type PropsData = {
  data: Props
  onRemove: () => void
}

export function Registros({ data, onRemove }: PropsData) {
  
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.middle}>
          <Text style={styles.itemlista}>
            {data.invoice}
          </Text>
          <Text style={styles.itemlista}>
            {data.taxcode}
          </Text>
          <Text style={styles.itemlista}>
            {data.state}
          </Text>
          <Text style={styles.itemlista}>
            {data.supplier}
          </Text>
          <Text style={styles.itemlista}>
            {data.invoicevalue}
          </Text>
          <Text style={styles.itemlista}>
            {data.taxamount}
          </Text>


        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={onRemove}
        >
          <Text>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

