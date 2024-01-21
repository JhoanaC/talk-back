import { Injectable } from "@nestjs/common";
import { OpenAI} from 'openai';

@Injectable()
export class ChatService{
    private openai: OpenAI;
    private conversationHistory:{
        role: "function" | "user" | "system" | "assistant";
        content: string;

    } [] = [];
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENIA_API_KEY,
        })
    }

    async chatWithGPT(content: string) {
        this.conversationHistory.push({
            role: 'user',
            content: content,
        });
        const chatCompletation = await this.openai.chat.completions.create({
            messages:[
                { role: "system", content: "you are a helful assistent"},
                //...this.conversationHistory
            ],
            model: 'gpt-3.5-turb',
        })

        this.conversationHistory.push({
            role: 'assistant',
            content: chatCompletation.choices[0].message.content,
        })

        return chatCompletation.choices[0].message.content;
    }

}