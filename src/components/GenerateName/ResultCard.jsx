import { Card, Title, Text, Badge, Button, Group } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons';
import { BLOCK_EXPLORER_URL_FOR_TX } from './../../constants/URLs';

import { useTranslation } from "react-i18next";


export default function ResultCard({ txHash, winnerName,contestName,randomNum}) {
   
    const { t } = useTranslation();

    return (
        <Card shadow="xl" p="lg" radius="md" withBorder>

            <Group position="apart" mb="xs" >
                <Text weight={500} color="blue">{contestName}</Text>
                <Badge color='blue' variant='dot'>
                    {randomNum}
                </Badge>
            </Group>

            <Title order={1} color='yellow' align='center' >
                {winnerName}
            </Title>

            <Button component="a" href={`${BLOCK_EXPLORER_URL_FOR_TX}${txHash}`}
                rel="noopener noreferrer"
                target="_blank" variant="light" color="blue" fullWidth mt="md" radius="md" leftIcon={<IconExternalLink size={14} />}>
                {t('verify_trans')}
            </Button>

        </Card>
    );
}