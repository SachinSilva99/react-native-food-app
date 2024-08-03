import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, Image, StyleSheet} from "react-native";
import {getOrders, Order} from "@/service/order-service";
import {Constants} from "@/util/Constants";
import Header from './header';

function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function loadOrders() {
    const resp = await getOrders();
    if (resp.statusCode === Constants.SUCCESS) {
      if (resp.data) {
        setOrders(resp.data);
        console.log(resp);
      }
    }
  }

  useEffect(() => {
    loadOrders().then();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header/>
      {orders?.map((order: Order) => (
        <View key={order._id} style={styles.orderContainer}>
          <Text style={styles.orderId}>Order ID: {order._id}</Text>
          <Text style={styles.orderDate}>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image source={{uri: item.foodItem.imageUrl}} style={styles.itemImage}/>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.foodItem.name}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.itemPrice}>Price: Rs : {item.foodItem.price}</Text>
              </View>
            </View>
          ))}
          <Text style={styles.orderTotal}>Total: Rs: {order.total}</Text>
          <Text>Order status <Text className={"text-blue-600"}>{order.status}</Text></Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  orderContainer: {
    marginBottom: 20,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  orderId: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderDate: {
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    justifyContent: 'center',
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemQuantity: {
    color: '#555',
  },
  itemPrice: {
    color: '#555',
  },
  orderTotal: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default OrderPage;
