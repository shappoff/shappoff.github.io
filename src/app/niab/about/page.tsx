import {Metadata} from "next";
import * as React from 'react';
import Box from '@mui/material/Box';
import BasicStack from "@/components/featured/niab/BasicStack";

const title = 'Индексация описей НИАБ';

const description =
`
Силами волонтёров и при поддержке и содействии со стороны архива осенью 2020 года стартовал проект по оцифровке описей НИАБа. К декабрю месяцу волонтёрами было переработано и проиндексировано почти 94 тысяч дел. Всё это стало возможным благодаря посильному вкладу и инициативе семи десятков энтузиастов. Процесс ещё далёк от завершения, ведь переработана только часть всего объёма и впереди солидный кусок работы. Вклад каждого кто желает присоединиться или уже участвует, позволит приблизиться к полной индексации описей и выйти всем на новый уровень поисков.

Всем кому интересно принять участие в индексации описей, присоединяйтесь.В качестве бонуса, доступ к поиску по всем проиндексированным дела инициативы и посильная помощь в решении вопросов по личным поискам предков. Вместе мы сделаем мир более упорядоченным!

Присоединяйтесь!
По вопросам участия пишите координатору проекта форумчанке Helena или на её почту poiskpredkov@mail.ru.
`

export const metadata: Metadata = {
    title,
    description,
    icons: [
        {
            url: '/niab/about/favicon.ico',
            type: 'image/x-icon',
            sizes: 'any',
            rel: 'icon'
        }
    ],
    keywords: ['НИАБ', 'Фонды', 'Описи', 'генеалогия', 'Беларусь'],
    referrer: 'origin',
    robots: {index: true, follow: true}

};

export default async function NIAB() {
    return <>

        <Box component="section" sx={{
            flexGrow: 1,
            margin: 3,
            color: 'black',
            lineHeight: 1.5
        }}>
            <h1 style={{ textAlign: 'center'}}>{title}</h1>
            <p style={{textIndent: '5%'}}>{description}</p>

            <BasicStack/>
        </Box>
    </>;
}
