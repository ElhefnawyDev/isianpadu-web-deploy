"use client"
import ProgressBar from "@/app/Components/services/ProgressBar";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface DataType {
  id: number;
  title: string;
  present: string;
}

const DataFetchingComponent: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.251/api/corevalue");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: DataType[] = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box className="w-full flex flex-wrap justify-center items-center">
      {data.map((progress, index) => (
        <ProgressBar
          key={index}
          title={progress.title}
          present={progress.present}
          font={40}
          number={false}
        />
      ))}
    </Box>
  );
};

export default DataFetchingComponent;
