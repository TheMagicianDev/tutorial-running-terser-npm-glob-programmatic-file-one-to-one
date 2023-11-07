import { nest } from './nested/nest';

export function hello() {
  const n = nest({ hi: 'hello' }, { hi: 'Hi, nice to see you' });
  console.log('Hello guys');
  console.log(JSON.stringify(n, null, 4));
}
