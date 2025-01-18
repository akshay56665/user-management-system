import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function EditUser() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    hobbies: [],
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams();

  // fuction to called when input values changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "hobbies") {
      const newarr = value.split(",");
      setFormData((prevData) => ({
        ...prevData,
        [name]: newarr,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  interface ApiResponseError {
    response: {
      data: string;
    };
  }

  // function to send data to backend for edit existing user
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, age, hobbies } = formData;
    const { userid } = params;
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userid}`, {
        name,
        age,
        hobbies,
      })
      .then(() => {
        toast({
          title: "Success",
          description: "User data edited successfully",
        });
        navigate("/");
      })
      .catch((err: ApiResponseError) => {
        toast({
          title: "Error",
          description: err.response.data,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Edit User
          </CardTitle>
          <CardDescription className="text-center">
            Edit the details you want to.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                placeholder="Enter your age here"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hobbies">Hobbies</Label>
              <Input
                id="hobbies"
                name="hobbies"
                type="text"
                placeholder="Enter hobbies"
                value={formData.hobbies}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Edit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
