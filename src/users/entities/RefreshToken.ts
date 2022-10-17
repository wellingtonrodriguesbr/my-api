import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("refresh_tokens")
export class RefreshToken {
  @PrimaryColumn()
  id?: string;

  @Column()
  token: string;

  @Column()
  valid: boolean;

  @Column()
  user_id: string;

  @Column()
  expires: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
