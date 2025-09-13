
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRounds } from "@/lib/hooks/useRounds";
import { useAuth } from "@/lib/providers/auth-provider";
import type { Round, RoundUser } from "@/lib/types";
import { Badge } from '@ui/badge';
import { Check } from 'lucide-react';
import { Link, Navigate, useNavigate } from "react-router";

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
      {rounds?.map((round: Round) => (
        <Card key={round.id} className="max-w-[550px]">
          <CardHeader>
              <CardTitle>
                <Link to={`/round/${round.id}`}>
                  ● Round ID: {round.id}
                </Link>
                
              </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span>
                Start: {new Date(round.startAt).toLocaleString()}
                </span>
                <span>
                  End: {new Date(round.endAt).toLocaleString()}
                </span>
            </div>
            <Separator className="my-5" />
            <div>
              Статус: {round.isActive ?( round.isInCoolDown ? "Cooldown" : 'Активен') : 'Не Активен'}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
