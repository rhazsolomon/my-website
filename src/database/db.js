import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    getDocs,
    setDoc,
    collection,
    doc,
    query,
    where
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';

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

export async function dbSet(setter, userId, collectionName) {
    const data = await getData(userId, collectionName)
    setter(data)
}

export async function addCategory(userId, label, color) {

    const userCol = collection(db, 'user')
    const userDoc = doc(userCol, userId)

    // Check if if already exists
    const categoryCol = collection(userDoc, 'category')
    const q = await query(categoryCol, where("label", "==", label))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length) {
        const l = querySnapshot.docs[0].data().id
        return l
    }

    // Create the new category
    const newCategoryId = `category_${uuidv4()}`
    await setDoc(doc(userDoc, 'category', newCategoryId), {
        id: newCategoryId,
        label: label,
        color: color,
        created: new Date()
    })
    return newCategoryId
}

export async function addTag(userId, label) {
    const newTagId = `tag_${uuidv4()}`

    const currentTags = await getData(userId, 'tag')
    for (let c of currentTags) {
        if (c.label === label) {
            return c.id
        }
    }

    const userCol = collection(db, 'user')
    const userDoc = doc(userCol, userId)
    await setDoc(doc(userDoc, 'tag', newTagId), {
        id: newTagId,
        label: label,
        created: new Date()
    })
    return newTagId
}

export async function addUser(name, email) {
    const userCol = collection(db, 'user')

    // Check for duplicates
    const q = await query(userCol, where("email", "==", email))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length) {
        const l = querySnapshot.docs[0].data().id

        return null
    }

    const newUserId = `user_${uuidv4()}`
    await setDoc(doc(db, 'user', newUserId), {
        id: newUserId,
        email: email,
        name: name,
        created: new Date()
    })
    return newUserId
}

export async function addTransaction(userId, amount, date, tagIds, categoryId) {
    const newTransactionId = `transaction_${uuidv4()}`

    const userCol = collection(db, 'user')
    const userDoc = doc(userCol, userId)
    await setDoc(doc(userDoc, 'transaction', newTransactionId), {
        id: newTransactionId,
        amount: amount,
        date: date,
        created: new Date(),
        tagIds: tagIds,
        categoryId: categoryId
    })
    return newTransactionId
}

export async function createNewUserWithDefaults(name, email) {

    const userId = await addUser(name, email)
    if (userId == null) { return null }

    const categoryIds = await Promise.all([
        addCategory(userId, 'Other', '#aaffff'),
        addCategory(userId, 'Bills', '#aaff33'),
        addCategory(userId, 'Food', '#aa22ff'),
        addCategory(userId, 'Fun', '#aaddff'),
    ])
    const tagIds = await Promise.all([
        addTag(userId, 'drunk'),
        addTag(userId, 'holiday')
    ])

    addTransaction(userId, 5, Date.parse('2022-03-12'), [tagIds[0]], categoryIds[0])
    addTransaction(userId, 3, Date.parse('2022-03-12'), [tagIds[0], tagIds[1]], categoryIds[1])
    addTransaction(userId, 10, Date.parse('2022-03-12'), [], categoryIds[1])
    addTransaction(userId, 20, Date.parse('2022-03-12'), [tagIds[1]], categoryIds[2])

}