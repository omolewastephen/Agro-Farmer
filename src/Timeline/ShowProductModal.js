import React, {Component} from 'react';
import { Ionicons } from '@expo/vector-icons';
import {View,Text,Modal} from 'react-native';
export default class ShowProductModal extends React.Component {
  render() {
    const { ref } = this.props;
    return (
      <View>
      <Modal
        ref={ref =>{
          this.ShowProductModal = ref
        }}
        animationType="fade"
        transparent={false}
        visible={this.state.modalVisible}
        key={data.id}
        onRequestClose={() => {
            alert('Modal has been closed.');
         }}>
        <View style={{margin: 10}}>
          <View>
          <View style={{padding: 10}}>
            <Text style={styles.headerText}>Product details: {data.product_name}</Text>
          </View>
          <View style={styles.cardheader}>
            <View style={styles.miniheader}>
              <Image style={styles.thumbnail} source={{uri: thumbnail}} />
              <Text style={styles.thumb_name}>{data.farmer_name}</Text>
            </View>
            <Text style={styles.timestamp}>{data.uploaded_time}</Text>
          </View>
          <View style={styles.cardbody}>
            <Image style={styles.cardbody_image} source={{uri: product_image}}/>
           <Text style={styles.p_name}>{data.product_name}</Text>
           <Text style={styles.p_desc}>{data.product_description}</Text>
           <View>
           </View>
           </View>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <Text>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
       </Modal>
      </View>
    );
  }
}
