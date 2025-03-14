import { memo } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

// Memoize WeekDiv since it's a pure component
export const WeekDiv = memo(({ date }) => (
    <div
      data-date={date.date}
      className="week border border-tertiary float-left text-center text-truncate"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          {date.href ? (
            <a href={date.href} target="_blank" rel="noopener noreferrer"
            title={formatDate(date.date)} className="!font-normal">
              {date.content}
            </a>
          ) : (
            <div title={formatDate(date.date)}>{date.content}</div>
          )}
        </TooltipTrigger>
        {date.description && (
          <TooltipContent>
            <p
              className={`!bg-gray-300 text-lg !text-gray-600 font-semibold px-2 py-1 ${
                date.description?.length > 0 ? "!mb-2" : "!mb-0"
              }`}
            >
              {formatDate(date.date)}
            </p>
            {date.description?.length > 0 && (
              <p className="text-md px-2 !mb-0 pb-2">{date.description}</p>
            )}
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  ));
  
  // Helper function to generate formatted date string
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };