import { trpc } from "@/app/_trpc/client";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { Loader2, MessageSquare } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Message from "./Message";

interface MesssagesProps {
  fileId: string;
}
const Messages = ({ fileId }: MesssagesProps) => {
  const { data, isLoading, fetchNextPage } =
    trpc.getFileMessages.useInfiniteQuery(
      {
        fileId,
        limit: INFINITE_QUERY_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        keepPreviousData: true,
      }
    );
  const messages = data?.pages.flatMap((page) => page.messages);
  const loadingMesssage = {
    createdAt: new Date().toISOString(),
    isUserMessage: false,
    id: "loading-message",
    text: (
      <span className="flex h-full items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </span>
    ),
  };
  const combinedMessages = [
    ...(true ? [loadingMesssage] : []),
    ...(messages ?? []),
  ];
  return (
    <div
      className="flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse
    gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-light scrollbar-w-2 scrolling-touch"
    >
      {combinedMessages && combinedMessages.length > 0 ? (
        combinedMessages.map((message, idx) => {
          const isNextMessageSamePerson =
            combinedMessages[idx - 1]?.isUserMessage ===
            combinedMessages[idx]?.isUserMessage;

          if (idx === combinedMessages.length - 1) {
            return (
              <Message
                key={message.id}
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
              />
            );
          } else {
            return (
              <Message
                key={message.id}
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
              />
            );
          }
        })
      ) : isLoading ? (
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <MessageSquare className="text-blue-500 h-8 w-8" />
          <h3 className="font-semibold text-xl">You&apos;re all set</h3>
          <p>Ask your first question to get started</p>
        </div>
      )}
    </div>
  );
};
export default Messages;
