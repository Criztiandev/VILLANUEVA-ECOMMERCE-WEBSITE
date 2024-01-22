import { motion } from "framer-motion";
import { ConvoModel } from "@/interface/model";

interface Props extends ConvoModel {
  onSelect: (payload: string) => void;
}

const ChatBlob = (convo: Props) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      onClick={() => convo.onSelect(convo?._id as string)}
      className="flex justify-between gap-4 cursor-pointer hover:bg-primary hover:text-white w-full border border-gray-300 rounded-[5px] p-4">
      <div className="flex gap-4">
        <div className="w-[48px] h-[48px] rounded-[5px] border border-gray-400 bg-primary flex justify-center items-center">
          <span className="text-[24px] font-semibold text-white">
            {convo.title[0].toUpperCase()}
          </span>
        </div>

        <div>
          <h3 className="font-semibold">{convo?.title}</h3>
          <span className="text-[14px] text-gray-400">
            {convo.messages[0].content}
          </span>
        </div>
      </div>

      <div className="badge bg-red-500 text-white  p-3">
        {convo.messages.length}
      </div>
    </motion.div>
  );
};

export default ChatBlob;
