'use client';

import type React from 'react';

import { useState, useCallback, useContext } from 'react';
import { X, RotateCw, ZoomIn, ZoomOut, ArrowLeftIcon } from 'lucide-react';
import { ParallaxContext } from '../MainPage';

interface ImageItem {
  id: string;
  src: string;
  name: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}
interface Props {
  setIsOpen: (val: boolean) => void;
}

export default function LoveAlbum({ setIsOpen }: Props) {
  const context = useContext(ParallaxContext);
  const theme = context?.theme;
  const imageFilenames: string[] = [];
  for (let i = 1; i <= 16; i++) {
    imageFilenames.push(`2 (${i}).jpg`);
  }

  const [images, setImages] = useState<ImageItem[]>(() =>
    imageFilenames.map((filename, index) => ({
      id: `img-${index}`,
      src: `/images/${filename}`,
      name: filename,
      // Distribute images more dynamically and responsively
      x: 50 + (index % 4) * 200, // Adjusted spacing for smaller screens
      y: 50 + Math.floor(index / 4) * 200, // Adjusted spacing for smaller screens
      rotation: 0,
      scale: 1,
    }))
  );

  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [draggedImage, setDraggedImage] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, imageId: string) => {
      const image = images.find((img) => img.id === imageId);
      if (!image) return;

      const rect = e.currentTarget.getBoundingClientRect();
      setDraggedImage(imageId);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [images]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!draggedImage) return;

      const containerRect = e.currentTarget.getBoundingClientRect();
      const newX = e.clientX - containerRect.left - dragOffset.x;
      const newY = e.clientY - containerRect.top - dragOffset.y;

      setImages((prev) =>
        prev.map((img) =>
          img.id === draggedImage
            ? {
                ...img,
                x: Math.max(0, Math.min(newX, containerRect.width - 200)),
                y: Math.max(0, Math.min(newY, containerRect.height - 200)),
              }
            : img
        )
      );
    },
    [draggedImage, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    setDraggedImage(null);
  }, []);

  const rotateImage = useCallback((imageId: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? { ...img, rotation: (img.rotation + 90) % 360 }
          : img
      )
    );
  }, []);

  const scaleImage = useCallback((imageId: string, delta: number) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? { ...img, scale: Math.max(0.5, Math.min(2, img.scale + delta)) }
          : img
      )
    );
  }, []);

  const hideImage = useCallback((imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-purple-100 overflow-hidden relative">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-20 animate-float" // animate-float for custom animation
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      {/* Header */}
      <div className="relative z-10 p-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-4 drop-shadow-lg">
          💕 My Album 🎂
        </h1>
      </div>
      {/* Photo Canvas */}
      <div
        className="relative mx-4 sm:mx-6 md:mx-12 lg:mx-24 mb-6 bg-white bg-opacity-30 backdrop-blur-sm rounded-3xl shadow-2xl border border-white border-opacity-50 min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden" // Adjusted min-heights and added overflow-hidden for cleaner look
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="absolute group cursor-grab active:cursor-grabbing select-none transition-transform duration-100 ease-out" // Added active:cursor-grabbing and transition
            style={{
              left: image.x,
              top: image.y,
              transform: `rotate(${image.rotation}deg) scale(${image.scale})`,
              zIndex: draggedImage === image.id ? 1000 : 1, // Keep Z-index for dragged image
            }}
            onMouseDown={(e) => handleMouseDown(e, image.id)}
          >
            <div className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-white border-opacity-80 hover:border-pink-300 hover:border-opacity-80 rounded-lg bg-white">
              <img
                src={image.src || '/placeholder.svg'}
                alt={image.name}
                className="w-40 h-40 sm:w-48 sm:h-48 object-cover cursor-pointer" // Made image size responsive
                onClick={() => setSelectedImage(image)}
                draggable={false}
                onError={(e) => {
                  e.currentTarget.src = `/placeholder.svg?height=192&width=192`;
                }}
              />

              {/* Control Buttons */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 z-20">
                {' '}
                {/* Added z-20 to ensure buttons are above image */}
                <button
                  className="h-7 w-7 p-0 bg-white bg-opacity-80 hover:bg-white rounded-full text-gray-700 hover:text-gray-900 flex items-center justify-center shadow-md hover:shadow-lg transition-all" // Rounded buttons, added shadow
                  onClick={(e) => {
                    e.stopPropagation();
                    rotateImage(image.id);
                  }}
                  aria-label="Rotate image" // Added ARIA label
                >
                  <RotateCw className="h-4 w-4" />
                </button>
                <button
                  className="h-7 w-7 p-0 bg-white bg-opacity-80 hover:bg-white rounded-full text-gray-700 hover:text-gray-900 flex items-center justify-center shadow-md hover:shadow-lg transition-all" // Rounded buttons, added shadow
                  onClick={(e) => {
                    e.stopPropagation();
                    hideImage(image.id);
                  }}
                  aria-label="Remove image" // Added ARIA label
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scale Controls */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 z-20">
                {' '}
                {/* Added z-20 */}
                <button
                  className="h-7 w-7 p-0 bg-white bg-opacity-80 hover:bg-white rounded-full text-gray-700 hover:text-gray-900 flex items-center justify-center shadow-md hover:shadow-lg transition-all" // Rounded buttons, added shadow
                  onClick={(e) => {
                    e.stopPropagation();
                    scaleImage(image.id, -0.1);
                  }}
                  aria-label="Zoom out" // Added ARIA label
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  className="h-7 w-7 p-0 bg-white bg-opacity-80 hover:bg-white rounded-full text-gray-700 hover:text-gray-900 flex items-center justify-center shadow-md hover:shadow-lg transition-all" // Rounded buttons, added shadow
                  onClick={(e) => {
                    e.stopPropagation();
                    scaleImage(image.id, 0.1);
                  }}
                  aria-label="Zoom in" // Added ARIA label
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>

              {/* Love decoration */}
              <div className="absolute -top-1 -left-1 text-red-400 text-sm">
                ❤️
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-fade-in">
          {' '}
          {/* Stronger backdrop, higher z-index, fade-in animation */}
          <div className="relative max-w-full lg:max-w-4xl max-h-[90vh]">
            {' '}
            {/* Increased max-height for better viewing */}
            <button
              className="absolute -top-10 sm:-top-12 right-0 bg-white bg-opacity-20 cursor-pointer hover:bg-white hover:bg-opacity-30 text-white px-3 py-1 rounded-full text-sm flex items-center justify-center transition-colors" // Rounded button, consistent styling
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
            >
              <X className="h-5 w-5 z-20" />
            </button>
            <img
              src={selectedImage.src || '/placeholder.svg'}
              alt={selectedImage.name}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border-4 border-white" // Added a white border to modal image
              onError={(e) => {
                e.currentTarget.src = `/placeholder.svg?height=600&width=800`;
              }}
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
              {' '}
              {/* Slightly darker background for text readability */}
              {selectedImage.name}
            </div>
          </div>
        </div>
      )}
      <div
        className="absolute right-4 top-4 h-12 w-12 shrink-0 rounded-full flex items-center justify-center bg-white cursor-pointer shadow-lg hover:shadow-xl transition-all z-30" // Increased size, added shadow, higher z-index
        onClick={() => setIsOpen(false)}
        aria-label="Go back to main page" // Added ARIA label
      >
        <ArrowLeftIcon className={`${theme?.primary} h-6 w-6`} />{' '}
        {/* Consistent icon sizing */}
      </div>{' '}
    </div>
  );
}
