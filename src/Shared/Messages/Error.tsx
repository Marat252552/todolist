import { Button, message, Space } from 'antd';

export const Error = (value: string) => {
    const [messageApi, contextHolder] = message.useMessage();
    const error = () => {
        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });
    }
    error()
    
}