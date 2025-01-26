const express = require("express");
const { Client, MessageMedia } = require("whatsapp-web.js");
const fs = require("fs");
const qrcode = require("qrcode-terminal");
const cors = require("cors"); // Import middleware CORS
const { createCanvas, loadImage } = require("canvas");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Tambahkan middleware CORS
app.use(express.json({ limit: "10mb" })); // Untuk menangani data URL besar

const client = new Client();

client.on("qr", (qr) => {
	console.log("Scan QR Code ini di aplikasi WhatsApp:");
	qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
	console.log("WhatsApp Client siap!");
});

client.initialize();

// Endpoint untuk mengirim gambar
app.post("/send-image", async (req, res) => {
	const { phoneNumber, cardNumber, imageDataUrl } = req.body;

	if (!phoneNumber || !cardNumber || !imageDataUrl) {
		return res.status(400).send({
			message: "Nomor telepon, nomor kartu, dan gambar harus disertakan!",
		});
	}

	try {
        // Decode data URL menjadi buffer
        const base64Data = imageDataUrl.replace(/^data:image\/png;base64,/, "");
        const tempFilePath = `./uploads/temp_${cardNumber}.png`;
        const finalFilePath = `./uploads/${cardNumber}.png`;

		// Simpan sementara file gambar ke disk
        fs.writeFileSync(tempFilePath, base64Data, "base64");

		// Load gambar dan tambahkan teks "Hadir" dan tanggal
        const image = await loadImage(tempFilePath);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");
    
        // Gambar ulang gambar asli di canvas
        ctx.drawImage(image, 0, 0);
    
        // Tambahkan teks "Hadir" dan tanggal
        const date = new Date();
        const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fillRect(10, 10, 200, 50); // Background untuk teks
        ctx.fillStyle = "black";
        ctx.fillText("Hadir", 20, 35);
        ctx.fillText(formattedDate, 20, 60);
    
        // Simpan gambar yang dimodifikasi ke disk
        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync(finalFilePath, buffer);
    
        // Kirim gambar melalui WhatsApp
        const media = MessageMedia.fromFilePath(finalFilePath);
        await client.sendMessage(`${phoneNumber}@c.us`, media);
    
        // Hapus file lokal sementara dan final setelah terkirim (opsional)
        fs.unlinkSync(tempFilePath);
        fs.unlinkSync(finalFilePath);
    
        res.status(200).send({ message: "Gambar berhasil dikirim!" });
	} catch (error) {
		console.error("Gagal mengirim gambar:", error);
		res.status(500).send({ message: "Gagal mengirim gambar." });
	}
});

app.listen(PORT, () => {
	console.log(`Server berjalan di http://localhost:${PORT}`);
});
