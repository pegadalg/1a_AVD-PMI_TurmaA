import { useState } from 'react'
import {Text,View,TextInput,TouchableOpacity,Alert,FlatList,} from "react-native";

import { styles } from './styles';
import { Registros } from "../../components/CadastroNF";
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

type Props = {
  id: string,
  invoice: string,
  taxcode: string,
  invoicevalue: string,
  state: string,
  supplier: string,
  taxamount: Float
  
}

export function Home() {

  const [invoice, setInvoice] = useState('');
  const [taxcode, setTaxcode] = useState('');
  const [state, setState] = useState('');
  const [supplier, setSupplier] = useState('');
  const [invoicevalue, setInvoiceValue] = useState('');
  const [register, setRegister] = useState<Props[]>([]);
  
  function calculateTaxAmount(invoicevalue: string): number {
    if ((taxcode.trim() === '1234' || taxcode.trim() === '6789') && state.trim() === 'RJ') {
      return parseFloat(invoicevalue) * 0.01
    }
    if ((taxcode.trim() === '1234' || taxcode.trim() === '6789') && state.trim() === 'SP') {
      return parseFloat(invoicevalue) * 0.02
    }
    if ((taxcode.trim() === '1234' || taxcode.trim() === '6789') && state.trim() === 'MG') {
      return parseFloat(invoicevalue) * 0.03
    }
    return 0
  }
  
  function handleAddNewRegister() {
  if (invoice.trim() === "") {
      return Alert.alert('Invoice', 'Favor preencha o campo "Invoice" ')
    }
  if (taxcode.trim() === "") {
      return Alert.alert('TaxCode', 'Favor preencha o campo "TaxCode" ')
    }
  if (state.trim() === "") {
      return Alert.alert('State', 'Favor preencha o campo "State" ')
    }
  if (supplier.trim() === "") {
      return Alert.alert('Supplier', 'Favor preencha o campo "Supplier" ')
    }
  if (invoicevalue.trim() === "") {
      return Alert.alert('Invoice Value', 'Favor preencha o campo "Invoice Value" ')
    }
    
  if (taxcode.trim() != "1234" && taxcode.trim() != "6789" && taxcode.trim() != "1708" && taxcode.trim() != "5952" ) {
      return Alert.alert('TaxCode', 'Códigos aceitos : 1234 , 6789 , 1708 , 5952')
    }
  if (state.trim() != "RJ" && state.trim() != "SP" && state.trim() != "MG") {
      return Alert.alert('State', 'Estados aceitos : RJ , SP , MG')
    }
  if (supplier.trim() != "Totvs" && supplier.trim() != "Microsoft") {
      return Alert.alert('Supplier', 'Fornecedores aceitos : Totvs e Microsoft')
    }

    const taxamount = calculateTaxAmount(invoicevalue)
    const data = {
      id: String(new Date().getTime()),
      invoice,
      taxcode,
      state,
      supplier,
      invoicevalue,
      taxamount
    }
    console.log(data)
    setRegister([...register, data])
    setInvoice('')
    setTaxcode('')
    setState('')
    setSupplier('')
    setInvoiceValue('')
  }


  function handleRemoveRegister(id: string) {
    Alert.alert('Remover', 'Remover o Cadastro da Nota Fiscal?', [
      {
        text: 'Sim',
        onPress: () => setRegister((prevRegister) => prevRegister.filter((registro) => registro.id !== id)),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.NF}>
        Cadastro de Nota Fiscal
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nota Fiscal"
          placeholderTextColor='#6B6B6B'
          autoCapitalize="words"
          value={invoice}
          onChangeText={value => setInvoice(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Código do Imposto"
          placeholderTextColor='#6B6B6B'
          autoCapitalize="none"
          value={taxcode}
          onChangeText={value => setTaxcode(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Estado"
          placeholderTextColor='#6B6B6B'
          value={state}
          onChangeText={value => setState(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Fornecedor"
          placeholderTextColor='#6B6B6B'
          value={supplier}
          onChangeText={value => setSupplier(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor da Nota Fiscal"
          placeholderTextColor='#6B6B6B'
          keyboardType="numeric"
          value={invoicevalue}
          onChangeText={value => setInvoiceValue(value)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddNewRegister}>
          <Text style={styles.buttonText}>
            Incluir
          </Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={register}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Registros
            data={item}
            onRemove={() => handleRemoveRegister(item.id)}
          />
        )}

      />
    </View>
  )
}


