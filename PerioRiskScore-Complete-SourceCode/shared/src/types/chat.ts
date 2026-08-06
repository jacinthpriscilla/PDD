export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'patient' | 'doctor' | 'admin' | 'ai';
  receiverId?: string;
  channelId: string;
  content: string;
  timestamp: string;
  isRead?: boolean;
}

export interface AIChatPrompt {
  message: string;
  context?: {
    patientName?: string;
    riskScore?: number;
    riskCategory?: string;
    symptoms?: string[];
  };
}

export interface AIChatResponse {
  reply: string;
  suggestedActions?: string[];
  disclaimer: string;
  timestamp: string;
}
