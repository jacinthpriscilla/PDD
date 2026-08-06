import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ChatMessage, AIChatPrompt, AIChatResponse } from '../../../shared/src';

export const messagesStore: ChatMessage[] = [
  {
    id: 'msg_1',
    senderId: 'doc_1',
    senderName: 'Dr. Marcus Vance, DDS',
    senderRole: 'doctor',
    channelId: 'pat_1_doc_1',
    content: 'Hello Sarah, I reviewed your recent AI risk report showing a high score of 68/100. Please ensure you keep your upcoming appointment.',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    isRead: true
  },
  {
    id: 'msg_2',
    senderId: 'pat_1',
    senderName: 'Sarah Jenkins',
    senderRole: 'patient',
    channelId: 'pat_1_doc_1',
    content: 'Thank you Doctor Vance! Will my bleeding gums stop after scaling?',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    isRead: true
  }
];

export const getMessages = async (req: AuthRequest, res: Response) => {
  const { channelId } = req.query;
  const filterChannel = channelId ? (channelId as string) : 'pat_1_doc_1';

  const channelMessages = messagesStore.filter(m => m.channelId === filterChannel);
  return res.status(200).json({ success: true, messages: channelMessages });
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
  const { content, channelId, receiverId } = req.body;

  if (!content) {
    return res.status(400).json({ success: false, message: 'Message content is required.' });
  }

  const newMsg: ChatMessage = {
    id: `msg_${Date.now()}`,
    senderId: req.user?.id || 'pat_1',
    senderName: req.user?.name || 'Sarah Jenkins',
    senderRole: req.user?.role || 'patient',
    receiverId,
    channelId: channelId || 'pat_1_doc_1',
    content,
    timestamp: new Date().toISOString(),
    isRead: false
  };

  messagesStore.push(newMsg);
  return res.status(201).json({ success: true, message: newMsg });
};

export const aiAssistantChat = async (req: AuthRequest, res: Response) => {
  try {
    const prompt: AIChatPrompt = req.body;
    const query = prompt.message.toLowerCase();

    let reply = "I am PerioRisk AI Assistant. Periodontal disease is an infection of the tissues that support your teeth. Maintaining good oral hygiene and visiting your periodontist regularly is key.";
    let suggestedActions = ["Schedule Doctor Consultation", "Re-take Risk Assessment", "View Oral Hygiene Tips"];

    if (query.includes('bleeding') || query.includes('bleed')) {
      reply = "Bleeding gums are a key indicator of gingival inflammation or early periodontitis. It occurs when plaque biofilm accumulates along the gumline. I recommend using an interdental brush daily and scheduling a scaling appointment.";
      suggestedActions = ["Book Scaling Appointment", "View Flossing Technique Guide"];
    } else if (query.includes('risk score') || query.includes('score') || query.includes('result')) {
      reply = "Your risk score is generated using our Random Forest Machine Learning model based on 10 clinical and lifestyle indicators including age, smoking, bleeding, and systemic factors. Scores above 55 suggest moderate-to-high risk.";
      suggestedActions = ["View Prediction Report", "Download PDF Report"];
    } else if (query.includes('pain') || query.includes('loose')) {
      reply = "Tooth mobility or sharp localized periodontal pain requires urgent clinical attention to assess alveolar bone height and pocket depth.";
      suggestedActions = ["Find Nearest Periodontist", "Emergency Appointment"];
    }

    const aiResponse: AIChatResponse = {
      reply,
      suggestedActions,
      disclaimer: "PerioRisk AI provides educational insights based on dental literature. It is not a substitute for clinical diagnosis.",
      timestamp: new Date().toISOString()
    };

    return res.status(200).json({ success: true, data: aiResponse });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
