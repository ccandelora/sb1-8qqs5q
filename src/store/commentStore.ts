import { create } from 'zustand';

export interface Comment {
  id: string;
  dreamId: string;
  userId: string;
  content: string;
  likes: number;
  createdAt: Date;
  userName: string;
  userAvatar: string;
}

interface CommentState {
  comments: Record<string, Comment[]>;
  addComment: (dreamId: string, content: string, user: { id: string; name: string; avatar: string }) => void;
  likeComment: (dreamId: string, commentId: string) => void;
  deleteComment: (dreamId: string, commentId: string) => void;
}

export const useCommentStore = create<CommentState>((set) => ({
  comments: {},
  addComment: (dreamId, content, user) => set((state) => ({
    comments: {
      ...state.comments,
      [dreamId]: [
        {
          id: Math.random().toString(36).substr(2, 9),
          dreamId,
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          content,
          likes: 0,
          createdAt: new Date(),
        },
        ...(state.comments[dreamId] || []),
      ],
    },
  })),
  likeComment: (dreamId, commentId) => set((state) => ({
    comments: {
      ...state.comments,
      [dreamId]: state.comments[dreamId]?.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ) || [],
    },
  })),
  deleteComment: (dreamId, commentId) => set((state) => ({
    comments: {
      ...state.comments,
      [dreamId]: state.comments[dreamId]?.filter(
        (comment) => comment.id !== commentId
      ) || [],
    },
  })),
}));