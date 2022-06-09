import { trpc } from "../utils/trpc";
import React from "react";

const QuestionCreator: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: () => {
      client.invalidateQueries("questions.get-all");
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });

  return (
    <input
      ref={inputRef}
      disabled={isLoading}
      className="border border-gray-300 rounded-lg p-2 flex w-full"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          mutate({ question: event.currentTarget.value });
          event.currentTarget.value = "";
        }
      }}
    />
  );
};

export default function Home() {
  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);
  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <div className="p-2">
      <div className="flex flex-col">
        <div className="text-2xl font-bold mb-2">Questions</div>
        <div className="mb-2">
          {data.map((question) => {
            return (
              <div key={question.id} className="mb-2">
                {question.question}
              </div>
            );
          })}
        </div>
      </div>
      <QuestionCreator />
    </div>
  );
}
