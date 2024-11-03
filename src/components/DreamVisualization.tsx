import React, { useState, useEffect } from 'react';
import { ImageIcon, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { generateDreamImage } from '../services/imageService';

interface DreamVisualizationProps {
  content: string;
  onImageGenerated?: (imageUrl: string) => void;
}

export default function DreamVisualization({ content, onImageGenerated }: DreamVisualizationProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    async function generateImage() {
      if (!content.trim()) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await generateDreamImage(content);
        setImageUrl(result.url);
        onImageGenerated?.(result.url);
        
        if (result.error) {
          console.warn('Image generation warning:', result.error);
        }
      } catch (err) {
        setError('Unable to generate dream visualization');
        console.error('Visualization error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    generateImage();
  }, [content, retryCount]);

  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="flex items-center justify-center gap-3 py-8">
          <Loader2 className="w-6 h-6 text-purple-300 animate-spin" />
          <p className="text-purple-200">Creating visualization...</p>
        </div>
      </div>
    );
  }

  if (!imageUrl || error) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="flex flex-col items-center gap-4 py-6">
          <AlertCircle className="w-8 h-8 text-red-400" />
          <p className="text-purple-200">{error || 'Failed to generate visualization'}</p>
          <button
            onClick={() => setRetryCount(c => c + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Dream Visualization
          </h3>
          <button
            onClick={() => setRetryCount(c => c + 1)}
            className="p-2 text-purple-300 hover:text-white transition-colors"
            title="Generate new visualization"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt="Dream visualization"
            className="w-full h-full object-cover"
            onError={() => {
              setError('Failed to load image');
              setImageUrl(null);
            }}
          />
        </div>
        
        <p className="text-sm text-purple-200 text-center italic">
          AI-generated visualization based on your dream description
        </p>
      </div>
    </div>
  );
}