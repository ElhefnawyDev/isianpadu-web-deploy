"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import { Separator } from "./Separator";
import { ScrollArea } from "./ScrollArea";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface Client {
  id: number;
  name: string;
  logo: string;
  category: string;
  date: string;
  projects: Array<{
    title: string;
    date: string;
    description: string;
  }>;
}

const ExperiencePage = () => {
  const [activeCategory, setActiveCategory] = useState<string>(
    "Government Ministry"
  );
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["Government Ministry", "GLC", "Private", "FSIs"];

  // Add abort controller for clean fetch cancellation
  useEffect(() => {
    const abortController = new AbortController();

    const fetchClients = async () => {
      try {
        setLoading(true);
        setClients([]); // Clear previous clients

        const response = await fetch(
          `/api/clients?category=${encodeURIComponent(activeCategory)}`,
          {
            signal: abortController.signal,
            cache: "no-store", // Prevent caching
          }
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setClients(data);
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Error fetching clients:", error);
          console.error("Failed to load clients. Please try again.", error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchClients();

    return () => abortController.abort();
  }, [activeCategory]); // Proper dependency array

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
  };

  const handleCloseDialog = () => {
    setSelectedClient(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Experiences</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => {
              console.log(`Switching to category: ${category}`);
              setActiveCategory(category);
            }}
            variant={activeCategory === category ? "default" : "outline"}
            className="w-40 h-12 rounded-full mt-8 transition"
          >
            {category}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <ClientBox
              key={client.id}
              client={client}
              onClick={() => handleClientClick(client)}
            />
          ))}
        </div>
      )}

      <ClientDialog client={selectedClient} onClose={handleCloseDialog} />
    </div>
  );
};

// Updated ClientBox component
type ClientBoxProps = {
  client: Client;
  onClick: () => void;
};

const ClientBox = ({ client, onClick }: ClientBoxProps) => {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
      onClick={onClick}
    >
      <CardContent className="p-8 flex flex-col items-center justify-center min-h-[240px] space-y-4">
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={client.logo}
            alt={`${client.name} logo`}
            fill
            className="rounded-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-xl font-semibold text-center">{client.name}</h3>
        <p className="text-sm text-gray-500 text-center">Since {client.date}</p>
        <p className="text-sm font-medium text-gray-600">
          {client.projects.length} Project
          {client.projects.length !== 1 ? "s" : ""}
        </p>
      </CardContent>
    </Card>
  );
};

// Updated ClientDialog component
type ClientDialogProps = {
  client: Client | null;
  onClose: () => void;
};

const ClientDialog = ({ client, onClose }: ClientDialogProps) => {
  if (!client) return null;

  return (
    <Dialog open={!!client} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] w-11/12 max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <Image
              src={client.logo}
              alt={`${client.name} logo`}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">{client.name}</h2>
              <p className="text-gray-500">Category: {client.category}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 h-[calc(90vh-200px)]">
          <div className="pr-4">
            <h3 className="text-xl font-semibold mb-4">Projects</h3>
            {client.projects.map((project, index) => (
              <div key={index}>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">{project.title}</h4>
                  <p className="text-sm text-gray-500">{project.date}</p>
                  <ReactMarkdown className="text-sm mt-2">
                    {project.description}
                  </ReactMarkdown>
                </div>
                {index < client.projects.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ExperiencePage;
