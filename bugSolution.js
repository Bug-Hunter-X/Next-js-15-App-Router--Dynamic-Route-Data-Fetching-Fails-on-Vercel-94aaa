```javascript
// pages/index.js
import {unstable_getServerSession} from 'next-auth/next' 
import {authOptions} from '../pages/api/auth/[...nextauth]' 

export default async function Home({session}) {
  const session = await unstable_getServerSession(req,res,authOptions)
  return (
    <div>Hello {session?.user?.email}</div>
  );
}

// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({session, user}){
      session.user.id = user.id
      return session
    }
  }
}
export default NextAuth(authOptions)

```