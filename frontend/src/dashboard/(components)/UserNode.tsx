import "@xyflow/react/dist/style.css";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import { Edge, Node } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface UserNodeData {
  _id: string;
  id: string;
  name: string;
  age: number;
  hobbies: string[];
}

const UserNode = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [seed, setSeed] = useState(1);
  const navigate = useNavigate();

  // function to handle drop of data
  const handleDrop = (event: any, user: any) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    user.hobbies.push(data);
    setSeed(Math.random());
  };

  // to delete user from backend
  const handleDelete = useCallback((id: string) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`)
      .then(() => {
        toast({
          title: "User deleted successfully",
        });
        setSeed(Math.random());
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.response.data,
          variant: "destructive",
        });
      });
  }, []);

  // to fetch data of users from backend
  const GetUserData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`
      );
      const userdata: UserNodeData[] = response.data;
      const newNodes: Node[] = [];
      const newEdges: Edge[] = [];

      userdata.forEach((user, userindex) => {
        let yPosition = userindex * 300;
        // Add user node
        newNodes.push({
          id: `user-${user.id}`,
          position: { x: 250, y: yPosition },
          data: {
            label: (
              <div
                className="flex flex-col"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, user)}
              >
                <b>{user.name}</b>
                <p>{user.age}</p>
                <div className="flex justify-between">
                  <Button
                    onClick={() => {
                      navigate(`/edituser/${user.id}`);
                    }}
                  >
                    <Pencil />
                  </Button>

                  <Button onClick={() => handleDelete(user.id)}>
                    <Trash />
                  </Button>
                </div>
              </div>
            ),
          },
          type: "input",
        });

        // Add hobby nodes and edges
        user.hobbies.forEach((hobby, hobbyIndex) => {
          const hobbyNodeId = `hobby-${user.id}-${hobbyIndex}`;

          newNodes.push({
            id: hobbyNodeId,
            position: { x: 250 * hobbyIndex + 100, y: yPosition + 200 },
            data: { label: hobby },
            type: "output",
          });

          newEdges.push({
            id: `edge-${user.id}-${hobbyIndex}`,
            source: `user-${user.id}`,
            target: hobbyNodeId,
            animated: true,
          });
        });
      });
      setNodes(newNodes);
      setEdges(newEdges);
    } catch (error: any) {
      toast({
        title: "error",
        description: error.response.data,
      });
    }
  }, []);

  useEffect(() => {
    GetUserData();
  }, [seed]);

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      className="flex flex-wrap gap-4 p-4"
    >
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default UserNode;
