"use client";

import { useReducer } from "react";
import Card from "./Card";

type Venue = {
  vid: string;
  name: string;
  image: string;
};

type RatingState = Map<string, number>;

type Action =
  | { type: "rate"; venueName: string; rating: number }
  | { type: "remove"; venueName: string };

const venues: Venue[] = [
  {
    vid: "001",
    name: "The Bloom Pavilion",
    image: "/img/bloom.jpg",
  },
  {
    vid: "002",
    name: "Spark Space",
    image: "/img/sparkspace.jpg",
  },
  {
    vid: "003",
    name: "The Grand Table",
    image: "/img/grandtable.jpg",
  },
];

function ratingReducer(state: RatingState, action: Action): RatingState {
  const newState = new Map(state);

  switch (action.type) {
    case "rate":
      newState.set(action.venueName, action.rating);
      return newState;
    case "remove":
      newState.delete(action.venueName);
      return newState;
    default:
      return state;
  }
}

const initialRatings: RatingState = new Map([
  ["The Bloom Pavilion", 0],
  ["Spark Space", 0],
  ["The Grand Table", 0],
]);

export default function CardPanel() {
  const [venueRatings, dispatch] = useReducer(ratingReducer, initialRatings);

  return (
    <div className="px-6 py-10">
      <div className="flex justify-center gap-8 flex-wrap">
        {venues.map((venue) => (
          <Card
            key={venue.vid}
            vid={venue.vid}
            venueName={venue.name}
            imgSrc={venue.image}
            rating={venueRatings.get(venue.name) ?? 0}
            onRatingChange={(value) =>
              dispatch({
                type: "rate",
                venueName: venue.name,
                rating: value,
              })
            }
          />
        ))}
      </div>

      <div className="mt-8 max-w-3xl mx-auto">
        <p className="font-bold mb-2">
          Venue List with Ratings : {venueRatings.size}
        </p>

        {Array.from(venueRatings.entries()).map(([venueName, rating]) => (
          <div
            key={venueName}
            data-testid={venueName}
            className="cursor-pointer"
            onClick={() => dispatch({ type: "remove", venueName })}
          >
            {venueName} : {rating}
          </div>
        ))}
      </div>
    </div>
  );
}