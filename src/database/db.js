import { initializeApp } from 'firebase/app'
import { getFirestore, getDocs, collection, doc } from 'firebase/firestore'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDpVmW_TlGtXXZBaN12OV8eRBV8xsrCQ4w",
    authDomain: "rhaz-website.firebaseapp.com",
    projectId: "rhaz-website",
    storageBucket: "rhaz-website.appspot.com",
    messagingSenderId: "352231566956",
    appId: "1:352231566956:web:551f88c4e93997f871b249"
})
const db = getFirestore(firebaseApp)

async function getData(userId, label) {
    const userCol = collection(db, 'user')
    const userDoc = doc(userCol, userId)
    const transactionsCol = collection(userDoc, label)
    const transactionSnapshot = await getDocs(transactionsCol)
    const transactionList = transactionSnapshot.docs.map(doc => doc.data())
    return transactionList

}

export async function dbSet(setter, userId, label) {
    const data = await getData(userId, label)
    setter(data)
}
