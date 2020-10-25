
import { createConnections } from 'typeorm';

createConnections();

// import { createConnection, getConnectionOptions, Connection } from 'typeorm';

// export default async (name = 'default'): Promise<Connection> => {
//   const defaultOptions = await getConnectionOptions();

//   return createConnection(
//     Object.assign(defaultOptions, {
//       name,
//       database:
//         process.env.NODE_ENV === 'test'
//           ? 'championship_tests'
//           : defaultOptions.database,
//     }),
//   );
// };

