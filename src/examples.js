import React from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import CustomisableAlert, { showAlert, closeAlert } from "react-native-customisable-alert";

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, width: 300, textAlign: 'center' }}>react-native-customisable-alert showcase</Text>

      <Button
        title="Success Alert"
        color='green'
        onPress={() => showAlert({
          title: 'Something went good!',
          message: 'Your code works!',
          alertType: 'success'
        })}
      />

      <Button
        title="Warning Alert"
        color='orange'
        onPress={() => showAlert({
          title: 'Are you sure?',
          message: 'This action will be irreversible!',
          alertType: 'warning',
          onPress: () => alert('Too late now!')
        })}
      />

      <Button
        title="Error Alert"
        color='red'
        onPress={() => showAlert({
          title: 'Something went wrong!',
          btnLabel: 'teste',
          message: 'You have lost all your data, sorry!'
        })}
      />

      <Button
        title="Custom Alert"
        onPress={() => showAlert({
          alertType: 'custom',
          customAlert:
            <View style={{ backgroundColor: 'black', padding: 20, width: '85%' }}>
              <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 20, color: 'white' }}>Could you tell us your name?</Text>

              <TextInput
                style={{ borderWidth: 1, padding: 5, paddingHorizontal: 10, fontSize: 18, backgroundColor: 'white' }}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                <Button
                  title="Cancel"
                  onPress={() => closeAlert()}
                />

                <Button
                  title="Send"
                  onPress={() => { }}
                />
              </View>
            </View>
        })}
      />

      <Button
        title="Custom Animation Alert"
        onPress={() => showAlert({
          // title: 'Something went wrong!',
          message: 'You have lost all your data, sorry!',
          animationIn: 'tada',
          animationOut: 'zoomOut'
        })}
      />

      <CustomisableAlert
        dismissable
        titleStyle={{
          fontSize: 18,
          fontWeight: 'bold'
        }}
        btnLabelStyle={{
          color: 'white',
          paddingHorizontal: 10,
          textAlign: 'center',
        }}
      />
    </View>
  )
}

export default App
