import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const hobbyArray = [
  "Reading",
  "Gaming",
  "Photography",
  "Cooking",
  "Gardening",
  "Painting",
  "Music",
  "Dancing",
  "Traveling",
  "Writing",
];

const SideBar = () => {
  const [hobbies, setHobbies] = useState<string[]>(hobbyArray);
  interface HandleSearchEvent {
    target: {
      value: string;
    };
  }

  const handleSearch = (e: HandleSearchEvent) => {
    const input = e.target.value.toLowerCase();
    const newarr = hobbyArray.filter((val: string) =>
      val.toLowerCase().includes(input)
    );
    setHobbies(newarr);
  };

  interface DragEvent {
    dataTransfer: {
      setData: (format: string, data: string) => void;
    };
  }

  const handleDragStart = (event: DragEvent, value: string) => {
    event.dataTransfer.setData("text/plain", value);
  };

  return (
    <div className="h-screen w-64 bg-blue-100 border-r rounded-lg">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-primary">Hobbies</h2>
        <div className="flex gap-2 my-3">
          <Input
            className="bg-white "
            placeholder="Search your desired hobby"
            onChange={handleSearch}
          />
        </div>

        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="space-y-2">
            {hobbies.map((hobby, index) => (
              <Card
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer transition-colors"
                draggable
                onDragStart={(e) => handleDragStart(e, hobby)}
              >
                <span className="text-sm">{hobby}</span>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SideBar;
