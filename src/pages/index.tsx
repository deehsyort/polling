import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC = () => {
  const { mutate } = trpc.useMutation("questions.create");

  return (
    <input
      className="border border-gray-300 rounded-lg p-2"
      onSubmit={(event) => {
        event.currentTarget.value;
      }}
    />
  );
};

export default function Home() {
  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);
  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <div>
      <div className="flex flex-col">
        <div className="text-2xl font-bold mb-2">Questions</div>
        <div className="mb-2">{data[0]?.question}</div>
      </div>
      <QuestionCreator />
    </div>
  );
}
