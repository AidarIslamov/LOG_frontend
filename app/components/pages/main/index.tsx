
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRounds } from "@/lib/hooks/useRounds";
import { useAuth } from "@/lib/providers/auth-provider";
import type { Round, RoundUser } from "@/lib/types";
import { Badge } from '@ui/badge';
import { Check } from 'lucide-react';
import { Link, useNavigate } from "react-router";

export function Main() {
  const { data: rounds } = useRounds();
  const { user } = useAuth();
  let navigate = useNavigate();

  function handleClick(uid: string) {
    navigate(`/round/${uid}`)
  } 

  return (
    <>
      <div>
        {user?.role == 'admin' ? 
          <Link to='/round'>
            <Button variant='success' > Create </Button>
          </Link>
          : <Button variant='success' disabled={!(user?.role === 'admin')}> Create </Button>
        }
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">id</TableHead>
            <TableHead className="w-[100px] ">Status</TableHead>
            <TableHead className="w-[180px] text-center">Start</TableHead>
            <TableHead className="w-[180px] text-center hidden md:table-cell">End</TableHead>
            <TableHead>Configurations</TableHead>
            <TableHead>Users</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rounds?.map((round: Round) => (
            <TableRow key={round.id} onClick={() => handleClick(round.id)} className="cursor-pointer">
              <TableCell className="font-medium">{round.id}</TableCell>
              <TableCell>
                <Check color={round.isActive ? 'green' : 'grey'} />
              </TableCell>
              <TableCell >{new Date(round.startAt).toLocaleString()}</TableCell>
              <TableCell >{new Date(round.endAt).toLocaleString()}</TableCell>
              <TableCell className="flex flex-col" >
                <span>Duration: {round.duration}</span>
                <span>Cooldown: {round.cooldown}</span>
              </TableCell>
              <TableCell >
                {round.users.map((roundUser: RoundUser) => (
                  <Badge key={roundUser.id} variant='outline'>{roundUser.name}</Badge>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
