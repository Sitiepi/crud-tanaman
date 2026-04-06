// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyDgGanI0xfwbMbF2Q20eftio7Hc6iyPVgI",
  authDomain: "insancemerlang-e9c87.firebaseapp.com",
  projectId: "insancemerlang-e9c87",
  storageBucket: "insancemerlang-e9c87.firebasestorage.app",
  messagingSenderId: "1009245252263",
  appId: "1:1009245252263:web:637bfe528eddfc0dc18982"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const tanamanCollection = collection(db, "tanaman")

export async function tampilkanDaftarTanaman() {
  // ambil snapshot data dari koleksi tanaman
  const snapshot = await getDocs(tanamanCollection)
  
  // ambil element tabel data
  const tabel = document.getElementById("tabelData")
  
  // ambil element tabel data
  
  
  //kosongkan isi tablel 
  tabel.innerHTML = ""
  
  //loop setiap dokumen dalam snapshot
  snapshot.forEach((doc) => {
    // variabel untuk menyimpan data 
    const data = doc.data()
    const id = doc.id
    
    // buat element baris baru
    const baris = document.createElement("tr")
    
    const  no = document.createElement("td")
    no.textContent = tabel.rows.length + 1
    
    //buat element kolom untuk nama tanaman 
    const namatanaman = document.createElement("td")
    namatanaman.textContent = data.namatanaman
    
    //buat element kolom untuk warna 
    const warna = document.createElement("td")
    warna.textContent = data.warna
    
    // buat kolom jenis
    const jenis = document.createElement("td")
    jenis.textContent = data.jenis
    
    // buat element kolom untuk Aksi
    const aksi = document.createElement("td")
    
        // buat tombol edit
    const tombolEdit = document.createElement("a")
    tombolEdit.textContent = "Edit"
    tombolEdit.href = "edit.html?id=" + id
    tombolEdit.className = "button edit"
    
    //buat tombol hapus
    const tombolHapus = document.createElement("button")
    tombolHapus.textContent = "Hapus"
    tombolHapus.className = "button delete"
    tombolHapus.onclick = async () => {
      await hapusTanaman(id)
    }
    
        //tambahkan element ke dalam kolom aksi
    aksi.appendChild(tombolEdit)
    aksi.appendChild(tombolHapus)
    
    //tambah kolom kedalam baris
    baris.appendChild(no)
    baris.appendChild(namatanaman)
    baris.appendChild(warna)
    baris.appendChild(jenis)
    baris.appendChild(aksi)
    
    //tambahkan baris kedalam tabel
    tabel.appendChild(baris)
  })
}

//fungsi untuk menambahkan data barang
export async function tambahDataTanaman() {
  //ambil nilai dari form
  const namatanaman = document.getElementById('namatanaman').value
  const warna = document.getElementById('warna').value
  const jenis = document.getElementById('jenis').value
  //tambahkan data ke firestore
  await addDoc(tanamanCollection, {
    namatanaman: namatanaman,
    warna: warna,
    jenis: jenis
  })
  
  //alihkan ke halaman daftar barang
  window.location.href = 'daftar.html'
}

//fungsi untuk menghapus data barang
export async function hapusTanaman(id) {
  if (!confirm("yakin ingin menghapus data ini?")) return
  //menghapus dokumen barang berdasarkan id
  await deleteDoc(doc(db, "tanaman", id))
  
  // refresh data barang
  await tampilkanDaftarTanaman()
}

//fungsi untuk menampilkan data barang berdasarkan id
export async function ambilDataTanaman(id) {
  const docRef = doc(db, "tanaman", id)
  const docSnap = await getDoc(docRef)
  
  return await docSnap.data()
}

//fiungsi untuk mengubah data barang
export async function ubahDataTanaman(id, namatanaman, warna, jenis) {
  await updateDoc(doc(db, "tanaman", id), {
    namatanaman: namatanaman,
    warna: warna,
    jenis: jenis
  })
  
  //alihlkan ke halaman daftar barang
  window.location.href = 'daftar.html'
  // Tab to edit
}