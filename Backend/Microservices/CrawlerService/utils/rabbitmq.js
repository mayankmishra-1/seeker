// utils/rabbitmq.js
import amqp from 'amqplib';

let channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672');
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
  }
};

export const publishToQueue = async (queueName, message) => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });
  console.log(`Sent message to queue "${queueName}"`);
};
