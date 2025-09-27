import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.static('public'));

// Serve QR scanner HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'qr-scanner.html'));
});

// API endpoint to receive scanned data
app.post('/api/scan', (req, res) => {
    try {
        const { qrData, timestamp, device } = req.body;
        
        console.log('📱 QR Code Scanned:', {
            data: qrData,
            timestamp: new Date(timestamp).toLocaleString(),
            device: device?.substring(0, 100) + '...',
            receivedAt: new Date().toLocaleString()
        });

        // Simulate processing (replace with your actual logic)
        setTimeout(() => {
            res.json({
                success: true,
                message: 'QR data received successfully',
                data: qrData,
                serverTime: new Date().toISOString(),
                processed: true
            });
        }, 500); // Simulate 500ms processing time

    } catch (error) {
        console.error('❌ Scan error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        server: 'QR Scanner Server',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎯 QR Scanner Server running on http://localhost:${PORT}`);
    console.log(`📱 Open this on your phone: http://localhost:${PORT}`);
    console.log(`🔧 Health check: http://localhost:${PORT}/health`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down QR Scanner Server...');
    process.exit(0);
});