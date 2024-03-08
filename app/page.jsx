"use client";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import { Line } from "react-chartjs-2";
import Footer from "@/app/components/footer";
import mqtt from "mqtt";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { useEffect, useState } from "react";

export default function Home() {
  // -----------------------------------
  /***
   * Browser
   * This document explains how to use MQTT over WebSocket with the ws and wss protocols.
   * EMQX's default port for ws connection is 8083 and for wss connection is 8084.
   * Note that you need to add a path after the connection address, such as /mqtt.
   */
  const url = "https://iot.cpe.ku.ac.th/b6610502129/price";
  /***
   * Node.js
   * This document explains how to use MQTT over TCP with both mqtt and mqtts protocols.
   * EMQX's default port for mqtt connections is 1883, while for mqtts it is 8883.
   */
  // const url = 'mqtt://broker.emqx.io:1883'

  // Create an MQTT client instance
  try {
    const options = {
      // Clean session
      clean: true,
      connectTimeout: 4000,
      // Authentication
      clientId: "mqttx_179ec7eb",
      username: "b6610502129",
      password: "nitisarath.p@ku.th",
    };
    const client = mqtt.connect(url, options);
    client.on("connect", function () {
      console.log("Connected");
      // Subscribe to a topic
      client.subscribe("test", function (err) {
        if (!err) {
          // Publish a message to a topic
          client.publish("test", "Hello mqtt");
        }
      });
    });

    // Receive messages
    client.on("message", function (topic, message) {
      // message is Buffer
      console.log(message.toString());
      client.end();
    });
  } catch (err) {
    console.log(err);
  }
  // -------------------------------------
  const [dataset, setDataset] = useState([2,4,5,1]);
  const [fast, setFast] = useState(1);
  const [slow, setSlow] = useState(3);
  const [now, setNow] = useState(5);
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
  const data = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        label: "button Data",
        data: dataset,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const options_line = {
    scales: {
      x: {
        type: "category",
        // Additional configuration for the x-axis can go here
      },
      y: {
        type: "linear",
        // Additional configuration for the y-axis can go here
      },
    },
  };
  useEffect(() => {
    const lowValue = Math.min(...dataset);
    const highValue = Math.max(...dataset);
    const lastValue = dataset[dataset.length - 1];
    setNow(lastValue)
    setFast(lowValue);
    setSlow(highValue);
  }, [dataset]);

  return (
    <>
      <Navbar />
      {/* ------------------ */}
      <section className="flex flex-row justify-evenly pt-10 pb-10 flex-wrap">
        <div
          href="#"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 w-64 mb-2 mb:mb-0"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            🚀 เร็วที่สุด
          </h5>
          <p className="font-normal text-gray-700">{fast} นาที</p>
        </div>
        <div
          href="#"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 w-64 mb-2 mb:mb-0"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            🔗 ล่าสุด
          </h5>
          <p className="font-normal text-gray-700">{now} นาที</p>
        </div>
        <div
          href="#"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 w-64 mb-2 mb:mb-0"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            💤 ช้าที่สุด
          </h5>
          <p className="font-xl text-gray-700 ">{slow} นาที</p>
        </div>
      </section>

      {/* ------------------------ */}
      <section className="flex justify-center">
        <div className=" w-1/2">
          <Line options={options_line} data={data} />
        </div>
      </section>
      <Footer />
    </>
  );
}
