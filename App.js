import { SafeAreaView, StyleSheet, Text, TextInput, View, Button, ScrollView, Pressable } from 'react-native';
import { firestore, SHOPLIST, collection, addDoc, serverTimestamp, query, onSnapshot, orderBy, doc, deleteDoc } from './firebase/config.js';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {
  const [shoplist, setShoplist] = useState([]);
  const [newShopitem, setNewShopitem] = useState('');

  useEffect(() => {
    const q = query(collection(firestore, SHOPLIST), orderBy('created', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempshoplist = [];
      querySnapshot.forEach((doc) => {
        tempshoplist.push({ ...doc.data(), id: doc.id });
      });
      setShoplist(tempshoplist);
    });
    return () => unsubscribe();
  }, [])

  const save = async () => {
    const docRef = await addDoc(collection(firestore, SHOPLIST), {
      text: newShopitem,
      created: serverTimestamp()
    }).catch(error => console.log(error));
    setNewShopitem('');
    console.log('product saved.');
  }

  const handleDelete = async (Text) => {
    try {
      const docRef = doc(firestore, SHOPLIST, Text);
      await deleteDoc(docRef);
      console.log('product deleted.');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollviewStyle}>
        {shoplist.map(product => (
          <View key={product.id} style={styles.product}>
            <Text style={styles.productItem}>{product.text}</Text>
            <Pressable onPress={() => handleDelete(product.id)} style={styles.pressableIcon}>
              <Icon name="trash" size={20} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <View style={styles.form}>
        <TextInput
          placeholder='add product...'
          value={newShopitem}
          onChangeText={text => setNewShopitem(text)}
        />
        <Button title="Add" onPress={save} />
      </View>

    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    marginTop: 16,
  },
  scrollviewStyle: {
    width: '100%',
    padding: 8,
    marginTop: 24,
  },
  productItem: {
    padding: 10,
    fontSize: 18,
  },
  pressableIcon: {
    bordercolor: '#666',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    justifyContent: 'center',
    padding: 4,
    borderWidth: 1,
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  product: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
    backgroundColor: '#e6e6e6',
    borderColor: '#ccc',
    borderBottomColor: '#666',
    borderBottomWidth: 1,
    borderRadius: 5
  },
  productInfo: {
    color: '#666',
    fontSize: 12
  }
});
