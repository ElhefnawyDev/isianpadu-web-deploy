import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getNewsEventWithLargestId() {
    try {
        const newsEventWithLargestId = await prisma.newsEvents.findFirst({
            orderBy: {
                id: 'desc',
            },
        });
        return newsEventWithLargestId;
    } catch (error) {
        console.error('Error fetching news event with largest ID:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}