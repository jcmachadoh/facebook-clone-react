export interface Author {
    id: string;
    name: string;
    avatarUrl: string;
}

export interface Contact {
    id: string;
    name: string;
    avatarUrl: string;
    isOnline: boolean;
}

export interface CommentData {
    id: string;
    author: Author;
    content: string;
    createdAt: string;
}

export interface PostData {
    id: string;
    author: Author;
    createdAt: string;
    content: string;
    mediaUrls?: string[];
    likesCount: number;
    commentsCount: number;
    isLikedByMe: boolean;
    comments?: CommentData[];
}

export interface FriendsData {
    id: string;
    name: string;
    avatarUrl: string;
    mutualFriends: number;
    status: 'friend' | 'suggestion' | 'request';
}

export interface VideoData {
    id: string;
    author: Author;
    description: string;
    thumbnailUrl: string;
    viewsCount: string;
    likesCount: number;
    createdAt: string;
    duration: string;
}

export interface Seller {
    name: string;
    avatarUrl: string;
}

export interface MarketplaceItem {
    id: string;
    title: string;
    price: number;
    currency: string;
    location: string;
    imageUrl: string;
    seller: Seller;
}

export interface SenderData {
    id: string;
    name: string;
    avatarUrl: string;
}
export interface MessagesData {
    id: string;
    sender: SenderData;
    lastMessage: string;
    timestamp: string;
    isUnread: boolean;
}

// Un mensaje individual dentro del chat
export interface ChatMessage {
    id: string;
    senderId: string; // 'me' si lo envié yo, o el ID del contacto si lo envió él
    text: string;
    timestamp: string;
}

// La conversación completa con un contacto
export interface ConversationData {
    contactId: string;
    messages: ChatMessage[];
}