import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function VoterCard({ nome, codigoVotacao }: { nome: string, codigoVotacao: number }) {
     return (
          <Card className="w-64 h-28 flex flex-col justify-center gap-1 border-2 mb-2">
               <CardHeader className="w-full flex items-center mt-1">
                    <CardTitle className=" w-[90%] text-center">{nome}</CardTitle>
               </CardHeader>
               <CardContent>
                    <div className="flex flex-col items-center gap-1">
                         <span className=" text-[0.7wrem] font-medium text-muted-foreground">Código de Votação</span>
                         <Badge variant="secondary" className="text-lg font-bold">
                              {codigoVotacao}
                         </Badge>
                    </div>
               </CardContent>
          </Card>
     )
} 