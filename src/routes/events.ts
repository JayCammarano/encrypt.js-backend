import { Request, Response, Router } from 'express';
import newEvent, { respondToInvite } from "../controllers/events";
import { authorizer } from '../middleware/authorization';
const router: Router = Router();

router.post('/new', authorizer, async (req: Request, res: Response) => {
  try {
    newEvent(req, res)
    res.status(200).json('Success');
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});


router.patch("/respond", authorizer, async (req: Request, res: Response) => {
  try {
    respondToInvite(req, res)
  } catch (error) {
    console.log(error)
  }
})
router.delete("/respond", authorizer, async (req: Request, res: Response) => {
  try {
    respondToInvite(req, res)
  } catch (error) {
    console.log(error)
  }
})

export { router };
