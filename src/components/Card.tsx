"use client";

import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Link from "next/link";
import InteractiveCard from "./InteractiveCard";

type CardProps = {
  vid?: string;
  venueName: string;
  imgSrc: string;
  rating?: number;
  onRatingChange?: (value: number) => void;
};

export default function Card({
  vid,
  venueName,
  imgSrc,
  rating,
  onRatingChange,
}: CardProps) {
  const [value, setValue] = useState<number | null>(rating ?? null);

  useEffect(() => {
    if (rating !== undefined) {
      setValue(rating);
    }
  }, [rating]);

  const ratingTestId = `${venueName} Rating`;
  const showRating = rating !== undefined && onRatingChange !== undefined;

  const cardContent = (
    <div className="w-80 overflow-hidden rounded-lg">
      <img
        src={imgSrc}
        alt={venueName}
        className="w-full h-52 object-cover"
      />
      <div className="p-4 pb-2">
        <h3 className="text-xl font-bold text-gray-800">{venueName}</h3>
      </div>

      {showRating && (
        <div
          className="px-4 pb-4"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Rating
            id={ratingTestId}
            name={ratingTestId}
            data-testid={ratingTestId}
            value={value}
            onChange={(_, newValue) => {
              const safeValue = newValue ?? 0;
              setValue(safeValue);
              onRatingChange(safeValue);
            }}
          />
        </div>
      )}
    </div>
  );

  return (
    <InteractiveCard>
      {vid ? (
        <Link href={`/venue/${vid}`}>
          <div className="cursor-pointer">{cardContent}</div>
        </Link>
      ) : (
        cardContent
      )}
    </InteractiveCard>
  );
}