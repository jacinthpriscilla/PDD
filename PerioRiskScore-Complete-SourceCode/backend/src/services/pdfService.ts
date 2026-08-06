import PDFDocument from 'pdfkit';
import { PredictionResult } from '../../../shared/src';

export function generateRiskReportPDF(prediction: PredictionResult): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Title & Branding Header
      doc.fillColor('#0f766e').fontSize(22).text('PerioRiskScore', { align: 'left' });
      doc.fontSize(10).fillColor('#64748b').text('AI-Powered Periodontal Disease Risk Assessment Report', { align: 'left' });
      doc.moveDown();
      doc.strokeColor('#0f766e').lineWidth(2).moveTo(40, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(1.5);

      // Patient Details Table
      doc.fillColor('#0f172a').fontSize(14).text('Patient Information', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(11).fillColor('#334155');
      doc.text(`Patient Name: ${prediction.patientName || 'Patient'}`);
      doc.text(`Patient Email: ${prediction.patientEmail || 'N/A'}`);
      doc.text(`Assessment ID: ${prediction.assessmentId || prediction.id || 'N/A'}`);
      doc.text(`Report Date: ${new Date(prediction.createdAt || Date.now()).toLocaleString()}`);
      doc.moveDown(1.5);

      // AI Risk Prediction Summary
      doc.fillColor('#0f172a').fontSize(14).text('AI Risk Prediction Summary', { underline: true });
      doc.moveDown(0.5);

      const riskCategory = prediction.riskCategory || 'Moderate Risk';
      const riskColor = riskCategory.includes('Low') ? '#16a34a' :
                        riskCategory.includes('Moderate') ? '#d97706' :
                        riskCategory.includes('High') ? '#ea580c' : '#dc2626';

      doc.fontSize(16).fillColor(riskColor).text(`Risk Level: ${riskCategory.toUpperCase()} (${prediction.riskScore} / 100)`);
      doc.moveDown(0.5);

      // Probability
      const probPct = typeof prediction.predictionProbability === 'number' 
        ? Math.round(prediction.predictionProbability * 100) 
        : 85;

      doc.fontSize(11).fillColor('#334155').text(`Prediction Confidence Probability: ${probPct}%`);
      doc.moveDown(1.5);

      // Recommendations
      doc.fillColor('#0f172a').fontSize(14).text('Personalized Clinical Recommendations', { underline: true });
      doc.moveDown(0.5);
      if (Array.isArray(prediction.recommendations)) {
        prediction.recommendations.forEach((rec, idx) => {
          doc.fontSize(11).fillColor('#0f172a').text(`${idx + 1}. ${rec}`);
          doc.moveDown(0.4);
        });
      }

      doc.moveDown(2);
      doc.fontSize(8).fillColor('#94a3b8').text('Disclaimer: PerioRiskScore is an AI prediction support tool trained on periodontal clinical indicators. This report does not replace formal clinical diagnosis by a licensed Periodontist or Dentist.', { align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
